pipeline{
    agent any
    
    environment{
        DOCKER_USERNAME= credentials('dockerhub')
        DOCKER_PASSWORD= credentials('dockerhub')
    }

    stages{
        stage("Build User service"){
            steps{
                dir('user-service'){
                    sh ''' 
                        echo "Building User Service "
                        docker build -t $DOCKER_USERNAME/user-service:latest .
                        echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
                        docker push $DOCKER_USERNAME/user-service:latest
                    '''
                }
            }
        }

        stage("Build Product Service"){
            steps{
                dir('product-service'){
                    sh ''' 
                    echo "Building Product Service"
                    docker build -t $DOCKER_USERNAME/product-service:latest .
                    echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
                    docker push $DOCKER_USERNAME/product-service:latest

                    '''
                }
            }
        }

        stage("Build Order Service"){
            steps{
                dir('order-service'){
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

    post{

        success{
            echo "All Services built and pushed Successfully!"
        }

        failure{
            echo "Build failed. Check the logs."
        }
    }


}