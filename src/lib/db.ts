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

export async function createSubject(data: Omit<SubjectItem, 'id'>): Promise<SubjectItem> {
  const maxOrder = await prisma.subject.count();
  return adaptSubject(await prisma.subject.create({
    data: {
      title: data.title,
      category: data.category,
      icon: data.icon,
      desc: data.desc,
      topicsJson: JSON.stringify(data.topics),
      order: maxOrder,
    }
  }))
}

export async function updateSubject(id: number, data: Omit<SubjectItem, 'id'>): Promise<SubjectItem> {
  return adaptSubject(await prisma.subject.update({
    where: { id },
    data: {
      title: data.title,
      category: data.category,
      icon: data.icon,
      desc: data.desc,
      topicsJson: JSON.stringify(data.topics),
    }
  }))
}

export async function deleteSubject(id: number): Promise<void> {
  await prisma.subject.delete({ where: { id } })
}

export async function reorderSubjects(orderedIds: number[]): Promise<void> {
  const updates = orderedIds.map((id, index) =>
    prisma.subject.update({ where: { id }, data: { order: index } })
  );
  await prisma.$transaction(updates);
}

export async function createAsatidz(data: Omit<AsatidzItem, 'id'>): Promise<AsatidzItem> {
  const maxOrder = await prisma.asatidz.count();
  return adaptAsatidz(await prisma.asatidz.create({
    data: {
      name: data.name,
      role: data.role,
      bio: data.bio,
      image: data.image,
      quote: data.quote,
      order: maxOrder,
    }
  }))
}

export async function updateAsatidz(id: number, data: Omit<AsatidzItem, 'id'>): Promise<AsatidzItem> {
  return adaptAsatidz(await prisma.asatidz.update({
    where: { id },
    data: {
      name: data.name,
      role: data.role,
      bio: data.bio,
      image: data.image,
      quote: data.quote,
    }
  }))
}

export async function deleteAsatidz(id: number): Promise<void> {
  await prisma.asatidz.delete({ where: { id } })
}

export async function reorderAsatidz(orderedIds: number[]): Promise<void> {
  const updates = orderedIds.map((id, index) =>
    prisma.asatidz.update({ where: { id }, data: { order: index } })
  );
  await prisma.$transaction(updates);
}

export async function createActivity(data: Omit<ActivityItem, 'id'>): Promise<ActivityItem> {
  const maxOrder = await prisma.activity.count();
  return adaptActivity(await prisma.activity.create({
    data: {
      title: data.title,
      category: data.category,
      date: data.date,
      image: data.image,
      description: data.description,
      order: maxOrder,
    }
  }))
}

export async function updateActivity(id: number, data: Omit<ActivityItem, 'id'>): Promise<ActivityItem> {
  return adaptActivity(await prisma.activity.update({
    where: { id },
    data: {
      title: data.title,
      category: data.category,
      date: data.date,
      image: data.image,
      description: data.description,
    }
  }))
}

export async function deleteActivity(id: number): Promise<void> {
  await prisma.activity.delete({ where: { id } })
}

export async function reorderActivities(orderedIds: number[]): Promise<void> {
  const updates = orderedIds.map((id, index) =>
    prisma.activity.update({ where: { id }, data: { order: index } })
  );
  await prisma.$transaction(updates);
}

export async function createDoa(data: Omit<SampleDoaItem, 'id'>): Promise<SampleDoaItem> {
  const maxOrder = await prisma.doa.count();
  return adaptSampleDoa(await prisma.doa.create({
    data: {
      title: data.title,
      arabic: data.arabic,
      latin: data.latin,
      meaning: data.meaning,
      order: maxOrder,
    }
  }))
}

export async function updateDoa(id: number, data: Omit<SampleDoaItem, 'id'>): Promise<SampleDoaItem> {
  return adaptSampleDoa(await prisma.doa.update({
    where: { id },
    data: {
      title: data.title,
      arabic: data.arabic,
      latin: data.latin,
      meaning: data.meaning,
    }
  }))
}

export async function deleteDoa(id: number): Promise<void> {
  await prisma.doa.delete({ where: { id } })
}

export async function reorderDoas(orderedIds: number[]): Promise<void> {
  const updates = orderedIds.map((id, index) =>
    prisma.doa.update({ where: { id }, data: { order: index } })
  );
  await prisma.$transaction(updates);
}