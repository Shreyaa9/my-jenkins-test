pipeline {
    agent any
    
    environment {
        AWS_ACCOUNT_ID = '138300868878'
        AWS_DEFAULT_REGION = 'ap-south-1'
        IMAGE_REPO_NAME = 'my-web-app'
        IMAGE_TAG = "${BUILD_NUMBER}"
        REPOSITORY_URI = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${IMAGE_REPO_NAME}"
    }
    
    stages {
        stage('Cloning Source Code') {
            steps {
                echo 'Pulling repository from GitHub...'
                checkout scm
            }
        }
        
        stage('Building Frontend Docker Image') {
            steps {
                echo 'Building Docker Image from frontend directory...'
                script {
                    // Yahan hum dir('frontend') use kar rahe hain taaki Jenkins frontend folder mein switch kare
                    dir('frontend') {
                        sh "docker build -t ${REPOSITORY_URI}:${IMAGE_TAG} ."
                        sh "docker build -t ${REPOSITORY_URI}:latest ."
                    }
                }
            }
        }
        
        stage('Pushing Image to Amazon ECR') {
            steps {
                echo 'Logging into Amazon ECR and pushing image...'
                script {
                    sh "aws ecr get-login-password --region ${AWS_DEFAULT_REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com"
                    sh "docker push ${REPOSITORY_URI}:${IMAGE_TAG}"
                    sh "docker push ${REPOSITORY_URI}:latest"
                }
            }
        }
    }
    
    post {
        success {
            echo 'Frontend image pushed to ECR successfully!'
        }
        failure {
            echo 'Pipeline failed. Check Jenkins console logs.'
        }
    }
}