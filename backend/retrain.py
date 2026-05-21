import pandas as pd
from sklearn.tree import DecisionTreeClassifier
from sklearn.preprocessing import LabelEncoder
import pickle

df = pd.read_csv('Crop_recommendation.csv')

print("Columns:", list(df.columns))
print("First row:\n", df.head(1))

# Use average of min/max for range columns
df['N_AVG']        = (df['N']                 + df['N_MAX'])               / 2
df['P_AVG']        = (df['P']                 + df['P_MAX'])               / 2
df['K_AVG']        = (df['K']                 + df['K_MAX'])               / 2
df['TEMP_AVG']     = (df['TEMP']              + df['MAX_TEMP'])            / 2
df['HUMIDITY_AVG'] = (df['RELATIVE_HUMIDITY'] + df['RELATIVE_HUMIDITY_MAX']) / 2
df['PH_AVG']       = (df['SOIL_PH']           + df['SOIL_PH_HIGH'])       / 2
df['WATER_AVG']    = (df['WATERREQUIRED']      + df['WATERREQUIRED_MAX'])  / 2

X = df[['N_AVG', 'P_AVG', 'K_AVG', 'TEMP_AVG', 'HUMIDITY_AVG', 'PH_AVG', 'WATER_AVG']]
y = df['CROPS']

le = LabelEncoder()
y_encoded = le.fit_transform(y)

model = DecisionTreeClassifier()
model.fit(X, y_encoded)

pickle.dump(model, open('best_model.pkl', 'wb'))
pickle.dump(le, open('label_encoder.pkl', 'wb'))

print("Done! Classes:", list(le.classes_))