import type { Patient } from '../types/patient';
import { faker } from '@faker-js/faker';

// Generate 20 mock patients (replace with more realistic data as needed)
function generateRandomPatient(id: number): Patient {
  return {
    id: id.toString(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    dateOfBirth: faker.date
      .birthdate({ min: 1940, max: 2010, mode: 'year' })
      .toISOString()
      .split('T')[0],
    gender: faker.helpers.arrayElement(['male', 'female']),
    email: faker.internet.email(),
    phone: faker.phone.number('555-####'),
    address: {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state({ abbreviated: true }),
      zipCode: faker.location.zipCode(),
      country: 'USA',
    },
    emergencyContact: {
      name: faker.person.fullName(),
      relationship: faker.helpers.arrayElement([
        'Spouse',
        'Mother',
        'Father',
        'Brother',
        'Sister',
        'Daughter',
        'Son',
      ]),
      phone: faker.phone.number('555-####'),
      email: faker.internet.email(),
    },
    medicalInfo: {
      allergies: faker.helpers.arrayElements(
        [
          'Penicillin',
          'Latex',
          'Peanuts',
          'Shellfish',
          'Soy',
          'Dairy',
          'Eggs',
          'Gluten',
          'Fish',
          'Tree Nuts',
        ],
        faker.number.int({ min: 0, max: 2 })
      ),
      currentMedications: [
        {
          id: faker.string.uuid(),
          name: faker.helpers.arrayElement([
            'Lisinopril',
            'Albuterol',
            'Metformin',
            'Sumatriptan',
            'Ibuprofen',
            'Cetirizine',
            'Sertraline',
            'Glutenase',
            'Atorvastatin',
            'Hydrocortisone',
          ]),
          dosage: faker.helpers.arrayElement([
            '10mg',
            '2 puffs',
            '500mg',
            '50mg',
            '200mg',
            '1 tablet',
            'Apply as needed',
            '81mg',
            '400mg',
            'Auto-injector',
          ]),
          frequency: faker.helpers.arrayElement([
            'Once daily',
            'Twice daily',
            'As needed',
            'With meals',
            'Nightly',
            'At bedtime',
          ]),
          prescribedBy: `Dr. ${faker.person.lastName()}`,
          startDate: faker.date.past({ years: 5 }).toISOString().split('T')[0],
          isActive: faker.datatype.boolean(),
        },
      ],
      conditions: faker.helpers.arrayElements(
        [
          'Hypertension',
          'Asthma',
          'Diabetes',
          'Migraines',
          'Arthritis',
          'Anxiety',
          'Celiac Disease',
          'High Cholesterol',
          'Eczema',
          'Sleep Apnea',
          'COPD',
          'Epilepsy',
          'Back Pain',
          'PCOS',
          'Heart Disease',
          'Thyroid',
          'Cancer',
        ],
        faker.number.int({ min: 0, max: 2 })
      ),
      bloodType: faker.helpers.arrayElement([
        'A+',
        'A-',
        'B+',
        'B-',
        'AB+',
        'AB-',
        'O+',
        'O-',
      ]),
      lastVisit: faker.date.recent({ days: 800 }).toISOString().split('T')[0],
      status: faker.helpers.arrayElement(['active', 'inactive', 'critical']),
    },
    insurance: {
      provider: faker.company.name(),
      policyNumber: faker.string.alphanumeric({ length: 8 }),
      effectiveDate: faker.date.past({ years: 5 }).toISOString().split('T')[0],
      copay: faker.number.int({ min: 10, max: 40 }),
      deductible: faker.number.int({ min: 500, max: 2000 }),
    },
    documents: [
      {
        id: faker.string.uuid(),
        name: faker.helpers.arrayElement([
          'Lab Results.pdf',
          'X-ray.png',
          'Prescription.pdf',
          'MRI Report.pdf',
          'Discharge Summary.pdf',
          'Allergy Test.pdf',
          'Mental Health Eval.pdf',
          'Celiac Panel.pdf',
          'Cholesterol Results.pdf',
          'Dermatology Report.pdf',
        ]),
        type: faker.helpers.arrayElement([
          'test_result',
          'medical_record',
          'other',
        ]),
        uploadDate: faker.date.past({ years: 5 }).toISOString().split('T')[0],
        url: `/mock-docs/${faker.string.uuid()}.pdf`,
        fileSize: faker.number.int({ min: 10000, max: 500000 }),
        mimeType: 'application/pdf',
      },
    ],
    createdAt: faker.date.past({ years: 5 }).toISOString().split('T')[0],
    updatedAt: faker.date.recent({ days: 800 }).toISOString().split('T')[0],
  };
}

export const patients: Patient[] = Array.from({ length: 5000 }, (_, i) =>
  generateRandomPatient(i + 1)
);
