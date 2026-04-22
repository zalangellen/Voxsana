import { create } from 'zustand'

const useStore = create((set) => ({
  step: 1,
  specialty: null,
  clips: [],
  currentCat: 'general',
  tFiles: [],
  pFiles: [],
  isRec: false,
  secs: 0,
  activeClipId: null,
  isVeRec: false,
  veSecs: 0,
  isProcessing: false,
  showReview: false,
  parsedFields: null,
  srcMap: null,
  mergedTx: '',
  sdocs: [],
  approved: false,

  setStep: (step) => set({ step }),
  setSpecialty: (specialty) => set({ specialty }),
  setCurrentCat: (cat) => set({ currentCat: cat }),

  addClip: (clip) => set((s) => ({ clips: [...s.clips, clip] })),
  updateClip: (id, updates) => set((s) => ({
    clips: s.clips.map((c) => (c.id === id ? { ...c, ...updates } : c)),
  })),
  removeClip: (id) => set((s) => ({ clips: s.clips.filter((c) => c.id !== id) })),
  clearClips: () => set({ clips: [] }),

  setTFiles: (files) => set({ tFiles: files }),
  removeTFile: () => set({ tFiles: [] }),
  addPFile: (file) => set((s) => ({ pFiles: [...s.pFiles, file] })),
  removePFile: (i) => set((s) => ({ pFiles: s.pFiles.filter((_, idx) => idx !== i) })),

  setIsRec: (isRec) => set({ isRec }),
  setSecs: (secs) => set({ secs }),
  setActiveClipId: (id) => set({ activeClipId: id }),
  setIsVeRec: (isVeRec) => set({ isVeRec }),
  setVeSecs: (veSecs) => set({ veSecs }),

  setProcessing: (isProcessing) => set({ isProcessing }),
  setReviewData: (data) => set({ ...data, showReview: true, isProcessing: false }),
  updateField: (index, updates) =>
    set((s) => ({
      parsedFields: s.parsedFields
        ? { ...s.parsedFields, fields: s.parsedFields.fields.map((f, i) => (i === index ? { ...f, ...updates } : f)) }
        : null,
    })),

  approveDoc: () => set({ clips: [], approved: true }),
  resetApproved: () => set({ approved: false }),
}))

export default useStore
