#rsync -avL --delete --progress -e "ssh -i Helpie-PRD-us-east-1.pem" build-prd/ ec2-user@35.172.115.59:/var/www/html/build-prd/
rsync -avL --progress -e "ssh -i Helpie-PRD-us-east-1.pem" build-landing-prd/ ec2-user@35.172.115.59:/var/www/html/build-landing-prd/
