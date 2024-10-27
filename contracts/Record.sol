// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Record {
    struct Patient {
        string name;
        string record;
        string init_v;
        string[] doctors;
        string[] enc_keys;  
    }

    mapping(string => Patient) private patients; // Mapping from patient ID to Patient
    mapping(string => string[]) private nameToIds; // Mapping from patient name to array of patient IDs

    // Function to add a new patient
    function addPatient(
        string memory id, 
        string memory _name, 
        string memory _record, 
        string memory _init_v,
        string[] memory _doctors, 
        string[] memory _enc_keys
    ) 
        public 
    {

        require(patients[id].doctors.length == 0, "Patient ID already exists");
        

        patients[id] = Patient({
            name: _name,
            record: _record,
            doctors: _doctors,
            enc_keys: _enc_keys,
            init_v: _init_v
        });
       

        nameToIds[_name].push(id); // Add the patient ID to the list of IDs for this name
    }

    // Function to retrieve patient details by ID
    function getPatient(string memory _patientId) public view returns (
        string memory, 
        string memory, 
        string memory, 
        string[] memory, 
        string[] memory
    ) {
        Patient storage patient = patients[_patientId];

        require(bytes(patient.name).length > 0, "Patient does not exist"); 
        return (patient.name, patient.record, patient.init_v, patient.doctors, patient.enc_keys);
    }

    // Function to retrieve all patient details by name
    function getPatientsByName(string memory _name) public view returns (Patient[] memory) {
        string[] memory ids = nameToIds[_name];
        Patient[] memory patientRecords = new Patient[](ids.length);
        
        for (uint i = 0; i < ids.length; i++) {
            patientRecords[i] = patients[ids[i]];
        }
        
        return patientRecords;
    }
}
