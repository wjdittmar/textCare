CREATE TABLE cmt_terminology (
    id SERIAL PRIMARY KEY,
    clinician_friendly_name VARCHAR(255) NOT NULL,
    patient_friendly_name VARCHAR(255) NOT NULL,
    icd_10_cm VARCHAR(15) NOT NULL,
    sctid BIGINT NOT NULL,
    fully_specified_name VARCHAR(500) NOT NULL,
    module VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_current BOOLEAN DEFAULT TRUE

);
CREATE UNIQUE INDEX idx_cmt_terminology_current
ON cmt_terminology (sctid, clinician_friendly_name, patient_friendly_name)
WHERE is_current = TRUE;

CREATE INDEX idx_cmt_patient_name_search ON cmt_terminology
USING gin(to_tsvector('english', patient_friendly_name))
WHERE is_current = TRUE;
