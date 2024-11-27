import os
from PIL import Image

def convert_png_to_webp(folder_path):
    if not os.path.exists(folder_path):
        print("Le dossier spécifié n'existe pas.")
        return

    files = os.listdir(folder_path)
    output_folder = os.path.join(folder_path, "webp_output")
    os.makedirs(output_folder, exist_ok=True)

    for file in files:
        if file.lower().endswith('.jpg'):
            input_path = os.path.join(folder_path, file)
            output_path = os.path.join(output_folder, os.path.splitext(file)[0] + '.webp')
            try:
                with Image.open(input_path) as img:
                    img.save(output_path, format="WEBP", quality=90)
                print(f"Converti : {file} -> {output_path}")
            except Exception as e:
                print(f"Erreur lors de la conversion de {file}: {e}")
    print(f"Conversion terminée. Les fichiers WEBP sont dans : {output_folder}")

if __name__ == "__main__":
    folder_path = "./images"
    convert_png_to_webp(folder_path)