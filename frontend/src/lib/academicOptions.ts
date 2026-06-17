export type Phase = "E" | "F";
export type PhaseFClassLevel = "XI" | "XII";
export type SubjectCategory = "umum" | "peminatan";
export type SpecializationKey = "MIPA" | "IPS" | "BAHASA" | "VOKASI";

export const generalSubjects = [
  "Pendidikan Agama Islam dan Budi Pekerti",
  "Pendidikan Agama Kristen dan Budi Pekerti",
  "Pendidikan Agama Katolik dan Budi Pekerti",
  "Pendidikan Agama Buddha dan Budi Pekerti",
  "Pendidikan Agama Hindu dan Budi Pekerti",
  "Pendidikan Agama Khonghucu dan Budi Pekerti",
  "Pendidikan Pancasila",
  "Bahasa Indonesia",
  "Matematika",
  "Fisika",
  "Kimia",
  "Biologi",
  "Sosiologi",
  "Ekonomi",
  "Sejarah",
  "Geografi",
  "Bahasa Inggris",
  "PJOK",
  "Informatika",
  "Seni dan Prakarya",
];

export const specializationGroups: Array<{ key: SpecializationKey; label: string; subjects: string[] }> = [
  {
    key: "MIPA",
    label: "Kelompok Mata Pelajaran MIPA",
    subjects: ["Biologi", "Kimia", "Fisika", "Informatika", "Matematika tingkat lanjut"],
  },
  {
    key: "IPS",
    label: "Kelompok Mata Pelajaran IPS",
    subjects: ["Sosiologi", "Ekonomi", "Geografi", "Antropologi"],
  },
  {
    key: "BAHASA",
    label: "Kelompok Mata Pelajaran Bahasa dan Budaya",
    subjects: [
      "Bahasa Indonesia tingkat lanjut",
      "Bahasa Inggris tingkat lanjut",
      "Bahasa Korea",
      "Bahasa Arab",
      "Bahasa Mandarin",
      "Bahasa Jepang",
      "Bahasa Jerman",
      "Bahasa Prancis",
    ],
  },
  {
    key: "VOKASI",
    label: "Kelompok Vokasi dan Prakarya",
    subjects: [
      "Prakarya dan Kewirausahaan (budidaya, kerajinan, rekayasa, atau pengolahan)",
      "Dikembangkan sesuai sumber daya yang tersedia",
    ],
  },
];

export const understandingLevels = [
  { value: "TIDAK_PAHAM", label: "Tidak Paham" },
  { value: "KURANG_PAHAM", label: "Kurang Paham" },
  { value: "PAHAM", label: "Paham" },
] as const;

export function getSpecializationByKey(key: string) {
  return specializationGroups.find((group) => group.key === key);
}
