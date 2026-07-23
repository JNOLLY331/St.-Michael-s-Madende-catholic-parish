import os
from dotenv import load_dotenv
load_dotenv()
import urllib.parse
import cloudinary
import cloudinary.uploader

url = os.getenv('CLOUDINARY_URL')
parsed = urllib.parse.urlparse(url)

media_dir = os.path.join(os.getcwd(), 'media')
if os.path.exists(media_dir):
    for root, dirs, files in os.walk(media_dir):
        for file in files:
            file_path = os.path.join(root, file)
            rel_path = os.path.relpath(file_path, media_dir)
            public_id, _ = os.path.splitext(rel_path)
            print(f"Uploading {rel_path} to Cloudinary as {public_id}...")
            try:
                cloudinary.uploader.upload(
                    file_path,
                    public_id=public_id,
                    overwrite=True,
                    resource_type="auto",
                    api_key=parsed.username,
                    api_secret=parsed.password,
                    cloud_name=parsed.hostname
                )
                print("Success.")
            except Exception as e:
                print(f"Failed {file_path}: {e}")
else:
    print("No media directory found.")
