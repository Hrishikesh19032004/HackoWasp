from flask import Flask, request, render_template_string
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler
from geopy.distance import geodesic

app = Flask(__name__)
CORS(app)


# Load the datasets
shops_df = pd.read_csv('shops_dataset.csv')
institutes_df = pd.read_csv('institutes_dataset.csv')

# Clean the shops dataset
shops_df = shops_df.drop(['Owner Name', 'Past Performance Score (0-100)'], axis=1)

def calculate_distance(lat1, lon1, lat2, lon2):
    return geodesic((lat1, lon1), (lat2, lon2)).kilometers

def get_top_5_shops(institute_id):
    try:
        institute = institutes_df[institutes_df['Institute ID'] == institute_id]
        if institute.empty:
            return None
        institute = institute.iloc[0]
        
        shops_df['Distance'] = shops_df.apply(lambda row: calculate_distance(
            institute['Latitude'], institute['Longitude'],
            row['Latitude'], row['Longitude']
        ), axis=1)
        
        top_5_shops = shops_df.sort_values('Distance').head(5)
        
        return top_5_shops[['Shop ID', 'Name', 'City', 'State', 'Distance'] + 
                           [col for col in shops_df.columns if 'Inventory' in col or 'Price' in col]]
    except Exception as e:
        print(f"An error occurred in get_top_5_shops: {e}")
        return None

def normalize_and_score(df):
    if df is None or df.empty:
        return None
    try:
        scaler = MinMaxScaler()
        inventory_cols = [col for col in df.columns if 'Inventory' in col]
        if not inventory_cols:
            return df
        df[inventory_cols] = scaler.fit_transform(df[inventory_cols])
        df['Inventory Score'] = df[inventory_cols].mean(axis=1)
        return df
    except Exception as e:
        print(f"An error occurred in normalize_and_score: {e}")
        return df

# Updated HTML template
html_template = """
<!DOCTYPE html>
<html>
<head>
    <title>Shop Recommendation System</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
        h1 { color: #333; }
        form { margin-bottom: 20px; }
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
    </style>
</head>
<body>
    <h1>Shop Recommendation System</h1>
    <form method="post">
        <label for="institute_name">Select Institute:</label>
        <select id="institute_name" name="institute_id" required>
            <option value="">-- Select an Institute --</option>
            {% for _, institute in institutes.iterrows() %}
                <option value="{{ institute['Institute ID'] }}">{{ institute['Name'] }}</option>
            {% endfor %}
        </select>
        <input type="submit" value="Get Recommendations">
    </form>
    {% if error %}
        <p style="color: red;">{{ error }}</p>
    {% endif %}
    {% if recommendations is not none and not recommendations.empty %}
        <h2>Top 5 Nearest Shops:</h2>
        <table>
            <tr>
                <th>Shop ID</th>
                <th>Name</th>
                <th>City</th>
                <th>State</th>
                <th>Distance (km)</th>
                <th>Inventory Score</th>
            </tr>
            {% for _, shop in recommendations.iterrows() %}
            <tr>
                <td>{{ shop['Shop ID'] }}</td>
                <td>{{ shop['Name'] }}</td>
                <td>{{ shop['City'] }}</td>
                <td>{{ shop['State'] }}</td>
                <td>{{ '%.2f'|format(shop['Distance']) }}</td>
                <td>{{ '%.2f'|format(shop['Inventory Score']) if 'Inventory Score' in shop else 'N/A' }}</td>
            </tr>
            {% endfor %}
        </table>
    {% elif recommendations is not none %}
        <p>No recommendations found for the given Institute ID.</p>
    {% endif %}
</body>
</html>
"""

@app.route('/', methods=['GET', 'POST'])
def index():
    institutes = institutes_df[['Institute ID', 'Name']]  # Ensure this matches your dataset
    recommendations = None  # Initialize recommendations to None

    try:
        if request.method == 'POST':
            institute_id = int(request.form['institute_id'])
            top_5_shops = get_top_5_shops(institute_id)
            if top_5_shops is not None and not top_5_shops.empty:
                recommendations = normalize_and_score(top_5_shops)
                return render_template_string(html_template, recommendations=recommendations, institutes=institutes)
            else:
                return render_template_string(html_template, error="No institute found with the given ID or error in fetching data.", institutes=institutes, recommendations=recommendations)

        return render_template_string(html_template, institutes=institutes, recommendations=recommendations)
    except ValueError:
        return render_template_string(html_template, error="Invalid Institute ID. Please select a valid institute.", institutes=institutes, recommendations=recommendations)
    except Exception as e:
        return render_template_string(html_template, error=f"An error occurred: {str(e)}", institutes=institutes, recommendations=recommendations)

@app.route('/api/institutes', methods=['GET'])
def get_institutes():
    return institutes_df.to_json(orient='records')

@app.route('/api/get-recommendations', methods=['POST'])
def get_recommendations():
    try:
        data = request.get_json()
        institute_id = int(data['institute_id'])
        top_5_shops = get_top_5_shops(institute_id)
        if top_5_shops is not None and not top_5_shops.empty:
            recommendations = normalize_and_score(top_5_shops)
            return recommendations.to_json(orient='records')
        else:
            return {'error': 'No recommendations found'}, 404
    except Exception as e:
        return {'error': str(e)}, 500

if __name__ == '__main__':
    app.run(debug=True,port=5002)
