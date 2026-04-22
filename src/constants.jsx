export const CAT_COLORS = {
  general: '#8a8a92', complaint: '#e05252', anamnesis: '#5b9bd5',
  status: '#4cad7c', diagnosis: '#c9a84c', plan: '#9b7ed4', admin: '#e0a052',
}

export const SRC_COLORS = {
  dictation: 'var(--blue)', lab: 'var(--cyan)', prev: 'var(--purple)',
  img: 'var(--green)', empty: 'var(--text4)',
}

export const SRC_CSS = {
  dictation: 'src-transcript', lab: 'src-lab', prev: 'src-prev',
  img: 'src-image', empty: 'src-empty',
}

export const CATS = ['general', 'complaint', 'anamnesis', 'status', 'diagnosis', 'plan', 'admin']

export const SPEC_NAMES = {
  gp: 'General Practice', cardiology: 'Cardiology', dermatology: 'Dermatology',
  neurology: 'Neurology', ortho: 'Orthopaedics', psychiatry: 'Psychiatry',
}

export const SPECIALTIES = [
  {
    key: 'gp', name: 'General Practice', desc: 'SOAP notes, referrals, prescriptions, BNO-10',
    icon: <svg viewBox="0 0 14 14"><circle cx="7" cy="4.5" r="2.5"/><path d="M1.5 12c0-2.5 2.5-4.5 5.5-4.5s5.5 2 5.5 4.5" strokeLinecap="round"/></svg>,
  },
  {
    key: 'cardiology', name: 'Cardiology', desc: 'ECG, cardiac notes, risk assessment',
    icon: <svg viewBox="0 0 14 14"><path d="M7 12S1.5 8 1.5 4.5a2.8 2.8 0 0 1 5.5-1A2.8 2.8 0 0 1 12.5 4.5C12.5 8 7 12 7 12z" strokeLinejoin="round"/></svg>,
  },
  {
    key: 'dermatology', name: 'Dermatology', desc: 'Lesion notes, biopsy, treatment plans',
    icon: <svg viewBox="0 0 14 14"><circle cx="7" cy="7" r="5"/><circle cx="5.5" cy="6.2" r=".8" fill="currentColor" stroke="none"/><circle cx="8.5" cy="6.2" r=".8" fill="currentColor" stroke="none"/><path d="M4.5 9c.7.7 4.3.7 5 0" strokeLinecap="round"/></svg>,
  },
  {
    key: 'neurology', name: 'Neurology', desc: 'Neurological exam, symptom mapping',
    icon: <svg viewBox="0 0 14 14"><path d="M7 1.5c-2.2 0-4 1.8-4 4 0 1.2.5 2.3 1.3 3L3.2 12.5h7.6L9.7 8.5c.8-.7 1.3-1.8 1.3-3 0-2.2-1.8-4-4-4z" strokeLinejoin="round"/></svg>,
  },
  {
    key: 'ortho', name: 'Orthopaedics', desc: 'Musculoskeletal, imaging findings',
    icon: <svg viewBox="0 0 14 14"><path d="M4.5 1.5l1.2 3.5H3.5l2 7.5M9.5 1.5l-1.2 3.5H10.5l-2 7.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  },
  {
    key: 'psychiatry', name: 'Psychiatry', desc: 'MSE, therapy notes, medication review',
    icon: <svg viewBox="0 0 14 14"><path d="M2.5 7c0-2.5 2-4.5 4.5-4.5S11.5 4.5 11.5 7c0 1.5-.7 2.8-1.8 3.7V12H4.3v-1.3C3.2 9.8 2.5 8.5 2.5 7z" strokeLinejoin="round"/></svg>,
  },
]

export const SPEC = {
  gp: `You are assisting a Hungarian General Practitioner. BNO-10 codes required.
Convert colloquial to clinical: "szúr a szíve"→precordialis fájdalom, "szédül"→vertigo/lipothymia, "dagadt a lába"→perifériás oedema, "nehezen vesz levegőt"→dyspnoea, "fáj a feje"→cephalalgia, "hányinger"→nausea, "hasmenés"→diarrhoea, "fül zúgás"→tinnitus, "vérköpés"→haemoptysis.
BNO: J06.9 légúti fertőzés, J03.9 tonsillitis, I10 hypertonia, E11 diabetes, M54.5 lumbago, J45 asthma, F32 depresszió, K29 gastritis.
Fields: chief_complaint, hpi, pmh, medications, allergies, exam_findings, diagnosis_bno, plan, prescription, referral, follow_up.`,
  cardiology: `You are assisting a Hungarian Cardiologist. BNO-10 required.
Convert: "szúr a szíve"→precordialis fájdalom, "szorítja mellkasát"→angina pectoris típusú panasz, "dobog a szíve"→palpitatio, "elfullad"→dyspnoea d'effort, "lába dagad"→bilaterális perifériás oedema.
BNO: I20 angina, I21 AMI, I48 pitvarfibrilláció, I50 szívelégtelenség, I10 hypertonia.
Fields: chief_complaint, cardiac_history, risk_factors, current_medications, bp_pulse, heart_sounds, ecg_findings, echo_results, diagnosis_bno, treatment_plan, follow_up.`,
  dermatology: `You are assisting a Hungarian Dermatologist. BNO-10 required.
Convert: "piros folt"→erythemás macula, "kidudorodás"→papula/nodulus, "hólyag"→vesicula/bulla, "viszketés"→pruritus, "hámlás"→desquamatio.
BNO: L20 atópiás dermatitis, L40 psoriasis, L50 urticaria, C44 bőrkarcinoma, L70 acne.
Fields: chief_complaint, lesion_description, skin_type, history, dermoscopy_findings, diagnosis_bno, treatment_plan, follow_up.`,
  neurology: `You are assisting a Hungarian Neurologist. BNO-10 required.
Convert: "fáj a feje"→cephalalgia, "szédül"→vertigo, "zsibbad"→paraesthesia, "reszket"→tremor, "görcsöl"→convulsio.
BNO: G43 migrén, G40 epilepszia, G35 sclerosis multiplex, G20 Parkinson.
Fields: chief_complaint, neurological_symptoms, onset, neuro_exam, imaging_findings, diagnosis_bno, medication_plan, follow_up.`,
  ortho: `You are assisting a Hungarian Orthopaedic Surgeon. BNO-10 required.
Convert: "fáj a térde"→arthralgia genus, "dagadt az ízülete"→articulatio effusio, "ropog"→crepitatio, "merev reggel"→reggeli ízületi merevség.
BNO: M17 gonarthrosis, M16 coxarthrosis, M75 váll szindróma, M54 hátfájás.
Fields: chief_complaint, injury_mechanism, pain_description, functional_limits, exam_findings, imaging_findings, diagnosis_bno, treatment_plan, physio_referral, follow_up.`,
  psychiatry: `You are assisting a Hungarian Psychiatrist. BNO-10 required.
Convert: "szomorú"→depressív hangulat, "szorongó"→anxietas, "nem tud aludni"→insomnia, "hallja a hangokat"→akusztikus hallucináció.
BNO: F32 depressziós epizód, F41 szorongásos zavar, F20 schizophrenia, F31 bipoláris zavar.
Fields: presenting_complaint, psychiatric_history, current_symptoms, mse, current_medications, diagnosis_bno, treatment_plan, risk_assessment, follow_up.`,
}
