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
    // stethoscope: U-shaped tubing + chest-piece circle
    icon: <svg viewBox="0 0 14 14" fill="none">
      <path d="M4 2.5v3.5a3 3 0 0 0 6 0V2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 9v1.2" strokeLinecap="round"/>
      <circle cx="7" cy="12" r="1.3"/>
    </svg>,
  },
  {
    key: 'cardiology', name: 'Cardiology', desc: 'ECG, cardiac notes, risk assessment',
    // heart + ECG pulse line beneath
    icon: <svg viewBox="0 0 14 14" fill="none">
      <path d="M7 9S2.5 6 2.5 3.8a2.2 2.2 0 0 1 4.5-.2 2.2 2.2 0 0 1 4.5.2C11.5 6 7 9 7 9z" strokeLinejoin="round"/>
      <path d="M1 12h2l.7-1.5.7 3 .5-2 .6.5H13" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>,
  },
  {
    key: 'dermatology', name: 'Dermatology', desc: 'Lesion notes, biopsy, treatment plans',
    // magnifying glass focusing on a skin lesion dot
    icon: <svg viewBox="0 0 14 14" fill="none">
      <circle cx="5.5" cy="5.5" r="3.5"/>
      <circle cx="5.5" cy="5.5" r="1.2" fill="currentColor" stroke="none"/>
      <path d="M8.2 8.2l3.5 3.5" strokeLinecap="round" strokeWidth="1.6"/>
    </svg>,
  },
  {
    key: 'neurology', name: 'Neurology', desc: 'Neurological exam, symptom mapping',
    // stylised two-lobe brain
    icon: <svg viewBox="0 0 14 14" fill="none">
      <path d="M5 12V9.8C3.2 9.3 2 7.9 2 6.2 2 4.3 3.4 3 5 3c.3 0 .5 0 .8.1A2.5 2.5 0 0 1 7 2.5c.7 0 1.3.3 1.8.7.2-.1.5-.2.7-.2C11 3 12.5 4.5 12.5 6.2c0 1.7-1.3 3-3 3.4V12" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5 12h4" strokeLinecap="round"/>
      <path d="M4.5 6c.4-.8 1.2-1 2-1" strokeLinecap="round"/>
      <path d="M9.5 6c-.4-.8-1.2-1-2-1" strokeLinecap="round"/>
    </svg>,
  },
  {
    key: 'ortho', name: 'Orthopaedics', desc: 'Musculoskeletal, imaging findings',
    // diagonal bone: two knobs joined by a thick shaft
    icon: <svg viewBox="0 0 14 14" fill="none">
      <circle cx="3.2" cy="3.2" r="1.7"/>
      <circle cx="10.8" cy="10.8" r="1.7"/>
      <path d="M4.6 4.6l4.8 4.8" strokeLinecap="round" strokeWidth="2.2"/>
    </svg>,
  },
  {
    key: 'psychiatry', name: 'Psychiatry', desc: 'MSE, therapy notes, medication review',
    // head silhouette with a thought/speech bubble
    icon: <svg viewBox="0 0 14 14" fill="none">
      <path d="M3.5 8C3.5 5.5 5 3.5 7 3.5S10.5 5.5 10.5 8c0 1.4-.6 2.6-1.6 3.3V13H5.1v-1.7C4.1 10.6 3.5 9.4 3.5 8z" strokeLinejoin="round"/>
      <circle cx="11" cy="3.5" r="1.8"/>
      <circle cx="9.2" cy="2.2" r=".9"/>
      <circle cx="7.8" cy="1.3" r=".5" fill="currentColor" stroke="none"/>
    </svg>,
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
