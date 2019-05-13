#### Firebase and cloudbuild
```bash
git clone https://github.com/GoogleCloudPlatform/cloud-builders-community
cd cloud-builders-community/firebase

gcloud builds submit --config cloudbuild.yaml .
# this will create gcr.io/$PROJECT_ID/firebase
```
