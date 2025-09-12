export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email?: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  prescribedBy: string;
  startDate: string;
  endDate?: string;
  isActive: boolean;
}

export interface InsuranceInfo {
  provider: string;
  policyNumber: string;
  groupNumber?: string;
  effectiveDate: string;
  expirationDate?: string;
  copay: number;
  deductible: number;
}

export interface Document {
  id: string;
  type:
    | 'medical_record'
    | 'insurance_card'
    | 'photo_id'
    | 'test_result'
    | 'other';
  name: string;
  uploadDate: string;
  fileSize: number;
  mimeType: string;
  url: string;
}

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  email: string;
  phone: string;
  address: Address;
  emergencyContact: EmergencyContact;
  medicalInfo: {
    allergies: string[];
    currentMedications: Medication[];
    conditions: string[];
    bloodType: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
    lastVisit: string;
    status: 'active' | 'inactive' | 'critical';
  };
  insurance: InsuranceInfo;
  documents: Document[];
  createdAt: string;
  updatedAt: string;
}
