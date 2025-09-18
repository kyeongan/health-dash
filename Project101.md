# Fullstack/Frontend - Take home - V1

# **Healthcare Dashboard**

## **Overview**

Build a modern, scalable React (Typescript) healthcare dashboard from scratch. This assessment evaluates your architectural decisions, technical choices, and ability to create maintainable, performant applications.

For the backend component, it is recommended to use Python with FastAPI.

**Context**: You're building a patient management dashboard for a medical practice. The application will grow over time to include multiple user types, complex workflows, and real-time features.

**Time Estimate:** We recommend spending no more than 2-4 hours on this exercise. Complete as many core tasks and stretch goals as possible within that timeframe.

**Submission Requirements**:

- Public GitHub repository or a zipped file.
- Comprehensive README.md
- Working application that can be run locally, including a `docker-compose.yml` file to launch the service

---

## **Evaluation Criteria**

We'll assess your submission based on:

- Correctness and completeness of each part
- Documentation and ease of local setup
- Code quality and employing best practices in software development
- Technical decision-making: library choices, state management, performance optimizations

---

## **Part 1: Project Foundation & Architecture**

Create a new React application from scratch and establish your architectural foundation.

**Tasks:**

1. **Initialize your project** using your preferred method (Vite, Create React App, Next.js, etc.)
2. **Design your folder structure** for a scalable application that will include:
    - Multiple user types (doctors, nurses, admins)
    - Complex forms and workflows
    - Shared components and utilities
    - Different feature modules
3. **Choose and configure your core dependencies**:
    - UI framework/component library
    - State management solution
    - Routing solution
    - Styling approach
    - Testing framework
4. **Set up development tooling**:
    - Linting and formatting
    - TypeScript configuration
    - Build optimization

---

## **Part 2: Core Dashboard Implementation**

Build the main dashboard with a patient list and basic navigation.

**Tasks:**

1. **Create a responsive layout** with:
    - Header with navigation
    - Sidebar (collapsible on mobile)
    - Main content area
    - Footer
2. **Implement a PatientList component** that displays:
    - Patient cards/rows with: name, age, last visit, status
    - Search/filter functionality
    - Sorting capabilities
    - Pagination or infinite scroll
3. **Add routing** for:
    - Dashboard home (/)
    - Patient list (/patients)
    - Individual patient view (/patients/:id)
    - 404 page
4. **Mock data setup**: Create realistic patient data (15-20 patients minimum)
    - You can use the following TypeScript interfaces as your starting point:
        
        ```tsx
        interface Address {
          street: string;
          city: string;
          state: string;
          zipCode: string;
          country: string;
        }
        
        interface EmergencyContact {
          name: string;
          relationship: string;
          phone: string;
          email?: string;
        }
        
        interface Medication {
          id: string;
          name: string;
          dosage: string;
          frequency: string;
          prescribedBy: string;
          startDate: string;
          endDate?: string;
          isActive: boolean;
        }
        
        interface InsuranceInfo {
          provider: string;
          policyNumber: string;
          groupNumber?: string;
          effectiveDate: string;
          expirationDate?: string;
          copay: number;
          deductible: number;
        }
        
        interface Document {
          id: string;
          type: 'medical_record' | 'insurance_card' | 'photo_id' | 'test_result' | 'other';
          name: string;
          uploadDate: string;
          fileSize: number;
          mimeType: string;
          url: string;
        }
        
        interface Patient {
          id: string;
          firstName: string;
          lastName: string;
          dateOfBirth: string;
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
        ```
        

**Performance Requirements:**

- List should handle 1000+ patients efficiently
- Search should be responsive (no blocking)
- Mobile performance should be considered

---

## **Part 3: State & Form Management**

Add patient creation/editing with complex form handling.

**Tasks:**

1. **Build a patient form** with:
    - Personal information (name, DOB, contact)
    - Medical history (allergies, medications, conditions)
    - Insurance information
    - Emergency contacts
2. **Implement form features**:
    - Validation
    - Auto-save drafts
    - Multi-step wizard OR single complex form
    - File upload for patient photos/documents
3. **Add global state management** for:
    - Current user session
    - Application-wide notifications
    - Recent patient activity
    - Form drafts
4. **Error handling** for:
    - Network failures
    - Validation errors
    - Permission errors

---

## **Stretch Goals (Choose Based on Time & Strengths)**

Choose 2-3 individual features from the list below that best demonstrate your expertise and interests:

### **Performance Optimization**

- Implement virtualization for large patient lists
- Add code splitting and lazy loading
- Optimize re-renders with memoization
- Bundle analysis and optimization

### **Real-time Features**

- WebSocket integration for live updates
- Optimistic updates for better UX
- Conflict resolution for concurrent edits
- Activity feeds/notifications

### **Advanced UI/UX**

- Dark/light theme switching
- Advanced search with filters
- Data visualization (charts/graphs)
- Drag-and-drop functionality

### **Testing & Quality**

- Comprehensive unit tests
- Integration tests for critical flows
- E2E tests for main user journeys
- Performance testing setup

### **Developer Experience**

- Create a Storybook for your components
- Set up CI/CD pipeline configuration
- Implement internationalization (i18n)
- Add analytics/monitoring setup

### **Production Readiness**

- Add offline capability with service workers
- Implement advanced security considerations
- Error boundary implementation
- Accessibility testing automation