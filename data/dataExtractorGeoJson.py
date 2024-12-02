import json

input_file = 'dadosPrivacidade.geojson'
output_file = 'moradas.json'

with open(input_file, 'r', encoding='utf-8') as file:
    geojson_data = json.load(file)

filtered_data = [
    {
        "street": feature['properties']['addr_street'],
        "house_number": feature['properties']['addr_housenumber'],
        "coordinates": feature['geometry']['coordinates']
    }
    for feature in geojson_data['features']
    if feature['properties'].get('addr_street') is not None or feature['properties'].get('addr_housenumber') is not None
]

with open(output_file, 'w', encoding='utf-8') as output:
    json.dump(filtered_data, output, ensure_ascii=False, indent=4)

print(f"JSON gerado: {output_file}")
