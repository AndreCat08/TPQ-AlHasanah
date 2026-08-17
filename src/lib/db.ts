import { prisma } from '@/lib/prisma';

export interface ProfileData {
  name: string
  tagline: string
  phone: string
  email: string
  address: string
  established: string
  stats: Array<{ label: string; count: string }>
}

export interface VisiMisiData {
  visi: string
  misi: string[]
}

export interface SubjectItem {
  id: number
  title: string
  category: string
  icon: string
  desc: string
  topics: string[]
}

export interface AsatidzItem {
  id: number
  name: string
  role: string
  bio: string
  image: string
  quote: string
}

export interface ActivityItem {
  id: number
  title: string
  category: string
  date: string
  image: string
  description: string
}

export interface SampleDoaItem {
  id: number
  title: string
  arabic: string
  latin: string
  meaning: string
}

export interface RegistrationItem {
  id: number
  name: string
  phone: string
  program: string
  message: string
  createdAt: Date
}

export interface DBStructure {
  profile: ProfileData
  visiMisi: VisiMisiData
  subjects: SubjectItem[]
  asatidz: AsatidzItem[]
  activities: ActivityItem[]
  sampleDoas: SampleDoaItem[]
  registrations: RegistrationItem[]
}


function adaptProfile(profile: any): ProfileData {
  return {
    name: profile.name,
    tagline: profile.tagline,
    phone: profile.phone,
    email: profile.email,
    address: profile.address,
    established: profile.established,
    stats: JSON.parse(profile.statsJson)
  }
}

function adaptVisiMisi(visiMisi: any): VisiMisiData {
  return {
    visi: visiMisi.visi,
    misi: JSON.parse(visiMisi.misiJson)
  }
}

function adaptSubject(subject: any): SubjectItem {
  return {
    id: subject.id,
    title: subject.title,
    category: subject.category,
    icon: subject.icon,
    desc: subject.desc,
    topics: JSON.parse(subject.topicsJson)
  }
}

function adaptAsatidz(asatidz: any): AsatidzItem {
  return {
    id: asatidz.id,
    name: asatidz.name,
    role: asatidz.role,
    bio: asatidz.bio,
    image: asatidz.image,
    quote: asatidz.quote
  }
}

function adaptActivity(activity: any): ActivityItem {
  return {
    id: activity.id,
    title: activity.title,
    category: activity.category,
    date: activity.date,
    image: activity.image,
    description: activity.description
  }
}

function adaptSampleDoa(doa: any): SampleDoaItem {
  return {
    id: doa.id,
    title: doa.title,
    arabic: doa.arabic,
    latin: doa.latin,
    meaning: doa.meaning
  }
}

export async function getProfile(): Promise<ProfileData> {
  const profile = await prisma.profile.findUniqueOrThrow({ where: { id: 1 } })
  return adaptProfile(profile)
}

export async function getVisiMisi(): Promise<VisiMisiData> {
  const visiMisi = await prisma.visiMisi.findUniqueOrThrow({ where: { id: 1 } })
  return adaptVisiMisi(visiMisi)
}

export async function getSubjects(): Promise<SubjectItem[]> {
  const subjects = await prisma.subject.findMany({
    orderBy: [{ order: 'asc' }, { id: 'asc' }]
  })
  return subjects.map(adaptSubject)
}

export async function getAsatidz(): Promise<AsatidzItem[]> {
  const asatidz = await prisma.asatidz.findMany({
    orderBy: [{ order: 'asc' }, { id: 'asc' }]
  })
  return asatidz.map(adaptAsatidz)
}

export async function getActivities(): Promise<ActivityItem[]> {
  const activities = await prisma.activity.findMany({
    orderBy: [{ order: 'asc' }, { id: 'asc' }]
  })
  return activities.map(adaptActivity)
}

export async function getSampleDoas(): Promise<SampleDoaItem[]> {
  const sampleDoas = await prisma.doa.findMany({
    orderBy: [{ order: 'asc' }, { id: 'asc' }]
  })
  return sampleDoas.map(adaptSampleDoa)
}

export async function getRegistrations(): Promise<RegistrationItem[]> {
  const registrations = await prisma.registration.findMany({
    orderBy: [{ createdAt: 'desc' }]
  })
  return registrations
}

export async function updateProfile(data: ProfileData) {
  const { stats, ...profileData } = data;
  await prisma.profile.upsert({
    where: { id: 1 },
    update: {
      ...profileData,
      statsJson: JSON.stringify(stats)
    },
    create: {
      ...profileData,
      id: 1,
      statsJson: JSON.stringify(stats)
    }
  })
}

export async function updateVisiMisi(data: VisiMisiData) {
  const { misi, ...visiMisiData } = data;
  await prisma.visiMisi.upsert({
    where: { id: 1 },
    update: {
      ...visiMisiData,
      misiJson: JSON.stringify(misi)
    },
    create: {
      ...visiMisiData,
      id: 1,
      misiJson: JSON.stringify(misi)
    }
  })
}

export async function addRegistration(name: string, phone: string, program: string, message: string): Promise<RegistrationItem> {
  const newReg = await prisma.registration.create({
    data: {
      name,
      phone,
      program,
      message,
      createdAt: new Date()
    }
  })
  return newReg
}