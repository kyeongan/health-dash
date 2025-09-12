from fastapi import FastAPI
import json
import os
from fastapi.middleware.cors import CORSMiddleware
from fastapi import HTTPException


# Instantiate FastAPI app first
app = FastAPI()
# Allow CORS for local frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_FILE = os.path.join(os.path.dirname(__file__), 'data/patients.json')

def load_patients():
    with open(DATA_FILE, 'r') as f:
        return json.load(f)

def save_patients(patients):
    with open(DATA_FILE, 'w') as f:
        json.dump(patients, f, indent=2)

@app.get("/")
def read_root():
    return {"message": "FastAPI backend is running"}

@app.get("/patients")
def get_patients():
    return load_patients()

@app.get("/patients/{patient_id}")
def get_patient(patient_id: str):
    patients = load_patients()
    for patient in patients:
        if patient["id"] == patient_id:
            return patient
    raise HTTPException(status_code=404, detail="Patient not found")

@app.post("/patients")
def add_patient(patient: dict):
    patients = load_patients()
    # Assign a new sequential numeric string ID
    existing_ids = [int(p["id"]) for p in patients if str(p["id"]).isdigit()]
    if existing_ids:
        new_id = str(max(existing_ids) + 1)
    else:
        new_id = "1"
    patient["id"] = new_id
    patients.append(patient)
    save_patients(patients)
    return patient

@app.put("/patients/{patient_id}")
def update_patient(patient_id: str, updated: dict):
    patients = load_patients()
    for i, patient in enumerate(patients):
        if patient["id"] == patient_id:
            patients[i] = updated
            save_patients(patients)
            return updated
    raise HTTPException(status_code=404, detail="Patient not found")

@app.delete("/patients/{patient_id}")
def delete_patient(patient_id: str):
    patients = load_patients()
    for i, patient in enumerate(patients):
        if patient["id"] == patient_id:
            del patients[i]
            save_patients(patients)
            return {"ok": True}
    raise HTTPException(status_code=404, detail="Patient not found")
