pipeline {
    agent any

    stages {
        stage("Build User Service") {
            steps {
                dir('user-service') {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh '''
                            echo "Building User Service"
                            docker build -t $DOCKER_USERNAME/user-service:latest .
                            echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
                            docker push $DOCKER_USERNAME/user-service:latest
                        '''
                    }
                }
            }
        }

        stage("Build Product Service") {
            steps {
                dir('product-service') {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh '''
                            echo "Building Product Service"
                            docker build -t $DOCKER_USERNAME/product-service:latest .
                            echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
                            docker push $DOCKER_USERNAME/product-service:latest
                        '''
                    }
                }
            }
        }

        stage("Build Order Service") {
            steps {
                dir('order-service') {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh '''
                            echo "Building Order Service"
                            docker build -t $DOCKER_USERNAME/order-service:latest .
                            echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
                            docker push $DOCKER_USERNAME/order-service:latest
                        '''
                    }
                }
            }
        }
    }

    post {
        success {
            echo "All Services built and pushed Successfully!"
        }
        failure {
            echo "Build failed. Check the logs."
        }
    }
}
