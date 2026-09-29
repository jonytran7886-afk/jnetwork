pipeline {
  agent any

  options {
    skipDefaultCheckout(true)
    disableConcurrentBuilds()
    buildDiscarder(logRotator(daysToKeepStr: '2', numToKeepStr: '2'))
    timeout(time: 30, unit: 'MINUTES')
  }

  parameters {
    choice(name: 'ENV', choices: ['production'], description: 'Môi trường build và deploy jnetwork')
  }

  // Docker Hub repository confirmed by the user; VPS values retained from the example.
  environment {
    IMAGE_REPOSITORY = 'jonytran86/jnetwork'
    DOCKER_CREDENTIAL = 'jenkin_login_docker_jonytran86'
    SSH_CREDENTIAL = 'jenkin_ssh_vps'
    REMOTE_HOST = '72.60.107.226'
    REMOTE_PORT = '22'
    REMOTE_USER = 'root'
    REMOTE_DIR = '/root/docker/jnetwork/jnetwork-production'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
        script {
          if (params.ENV != 'production') {
            error('Only production is configured.')
          }
          def revision = sh(script: 'git rev-parse --short=12 HEAD', returnStdout: true).trim()
          env.JNETWORK_IMAGE = "${env.IMAGE_REPOSITORY}:${env.BUILD_NUMBER}-${revision}"
          env.COMPOSE_FILE_LOCAL = "docker/docker-compose.${params.ENV}.yml"
        }
      }
    }

    stage('Build Docker Image') {
      steps {
        sh '''
          set -eu
          docker version
          docker compose version
          docker compose --env-file .env.production -f "$COMPOSE_FILE_LOCAL" config --quiet
          docker compose --env-file .env.production -f "$COMPOSE_FILE_LOCAL" build jnetwork
        '''
      }
    }

    stage('Push Docker Hub') {
      steps {
        withCredentials([usernamePassword(
          credentialsId: env.DOCKER_CREDENTIAL,
          usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS'
        )]) {
          sh '''
            set -eu
            set +x
            DOCKER_CONFIG=$(mktemp -d)
            export DOCKER_CONFIG
            trap 'rm -rf "$DOCKER_CONFIG"' EXIT
            printf '%s' "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
            docker push "$JNETWORK_IMAGE"
            docker tag "$JNETWORK_IMAGE" "$IMAGE_REPOSITORY:latest"
            docker push "$IMAGE_REPOSITORY:latest"
          '''
        }
      }
    }

    stage('Copy Compose to VPS') {
      steps {
        withCredentials([sshUserPrivateKey(
          credentialsId: env.SSH_CREDENTIAL, keyFileVariable: 'SSH_KEY'
        )]) {
          sh '''
            set -eu
            ssh -i "$SSH_KEY" -p "$REMOTE_PORT" -o BatchMode=yes -o StrictHostKeyChecking=yes \
              "$REMOTE_USER@$REMOTE_HOST" "mkdir -p '$REMOTE_DIR'"
            scp -i "$SSH_KEY" -P "$REMOTE_PORT" -o BatchMode=yes -o StrictHostKeyChecking=yes \
              docker/docker-compose.yml "$REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR/docker-compose.yml"
            scp -i "$SSH_KEY" -P "$REMOTE_PORT" -o BatchMode=yes -o StrictHostKeyChecking=yes \
              .env.production "$REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR/.env.production"
          '''
        }
      }
    }

    stage('Deploy to VPS') {
      steps {
        withCredentials([
          sshUserPrivateKey(credentialsId: env.SSH_CREDENTIAL, keyFileVariable: 'SSH_KEY'),
          usernamePassword(credentialsId: env.DOCKER_CREDENTIAL,
            usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')
        ]) {
          sh '''
            set -eu
            set +x
            # Only a Docker Hub username is interpolated into the SSH command.
            case "$DOCKER_USER" in ''|*[!a-zA-Z0-9_-]*) exit 1 ;; esac
            printf '%s' "$DOCKER_PASS" | ssh -i "$SSH_KEY" -p "$REMOTE_PORT" \
              -o BatchMode=yes -o StrictHostKeyChecking=yes "$REMOTE_USER@$REMOTE_HOST" "
                set -eu
                cd '$REMOTE_DIR'
                umask 077
                touch .env
                export DOCKER_CONFIG=\\$(mktemp -d)
                trap 'rm -rf \\"\\$DOCKER_CONFIG\\"' EXIT
                docker login -u '$DOCKER_USER' --password-stdin
                export JNETWORK_IMAGE='$JNETWORK_IMAGE'
                docker compose --env-file .env.production --env-file .env -p jnetwork-production -f docker-compose.yml pull jnetwork
                docker compose --env-file .env.production --env-file .env -p jnetwork-production -f docker-compose.yml up -d --wait --wait-timeout 120 jnetwork
                docker compose --env-file .env.production --env-file .env -p jnetwork-production -f docker-compose.yml ps
              "
          '''
        }
      }
    }
  }

  post {
    success {
      echo "Deployed ${env.JNETWORK_IMAGE} to ${env.REMOTE_HOST} (default port 3112)."
    }
    failure {
      echo 'Build/push/deploy failed. Check the failing stage; no automatic rollback was performed.'
    }
  }
}
