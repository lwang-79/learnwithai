
export type ChatMessage = {
  role: string
  content: string
}

export const ClassroomFunction = [{
  name: 'generateClassroomChatContent',
  description: 'Generate the content of the chat in a classroom.',
  parameters: {
    type: 'object',
    properties: {
      words: {
        type: 'string',
        description: 'The generated the words of the current role.'
      },
      nextRole: {
        type: 'string',
        description: 'The name of the next role to speak.',
      },
    },
    required: ['words']
  }
}]

export type Character = {
  role: 'teacher' | 'student'
  name: string
  picture: string
  gender: 'male' | 'female'
  skill: number // 1 - 10
  behavior?: string
  voice?: string
}

export const Teachers: Character[] = [{
    role: 'teacher',
    name: 'Lepilio',
    picture: '/classroom/teacher-0.png',
    gender: 'female',
    skill: 10,
    behavior: 'nice',
    voice: 'Joanna'
  }, {
    role: 'teacher',
    name: 'Furgerson',
    picture: '/classroom/teacher-2.png',
    gender: 'male',
    skill: 10,
    behavior: 'humor',
    voice: 'Matthew'
  }, {
    role: 'teacher',
    name: 'Cheung',
    picture: '/classroom/teacher-1.png',
    gender: 'female',
    skill: 10,
    behavior: 'strict',
    voice: 'Kimberly'
  }
]

export const Boys: Character[] = [{
  role: 'student',
  name: 'Lundy',
  picture: '/classroom/student-m-0.png',
  gender: 'male',
  skill: 1,
  behavior: 'naughty and energetic'
}, {
  role: 'student',
  name: 'Lucas',
  picture: '/classroom/student-m-1.png',
  gender: 'male',
  skill: 2,
  behavior: 'confident and adventurous'
}, {
  role: 'student',
  name: 'Aaron',
  picture: '/classroom/student-m-2.png',
  gender: 'male',
  skill: 3,
  behavior: 'curious and kind'
}, {
  role: 'student',
  name: 'Ricky',
  picture: '/classroom/student-m-3.png',
  gender: 'male',
  skill: 4,
  behavior: 'adventurous and careless'
}, {
  role: 'student',
  name: 'Asher',
  picture: '/classroom/student-m-4.png',
  gender: 'male',
  skill: 5,
  behavior: 'smart and lazy'
}, {
  role: 'student',
  name: 'Eric',
  picture: '/classroom/student-m-5.png',
  gender: 'male',
  skill: 4,
  behavior: 'honest and steady'
}]

export const Girls: Character[] = [{
  role: 'student',
  name: 'Chara',
  picture: '/classroom/student-f-0.png',
  gender: 'female',
  skill: 1,
  behavior: 'naughty and modest'
}, {
  role: 'student',
  name: 'Genevie',
  picture: '/classroom/student-f-1.png',
  gender: 'female',
  skill: 2,
  behavior: 'confident and cheerful'
}, {
  role: 'student',
  name: 'Jessica',
  picture: '/classroom/student-f-2.png',
  gender: 'female',
  skill: 3,
  behavior: 'optimistic and kind'
}, {
  role: 'student',
  name: 'Mia',
  picture: '/classroom/student-f-3.png',
  gender: 'female',
  skill: 4,
  behavior: 'adventurous and careless'
}, {
  role: 'student',
  name: 'Jin',
  picture: '/classroom/student-f-4.png',
  gender: 'female',
  skill: 5,
  behavior: 'intelligent and patient'
}, {
  role: 'student',
  name: 'Selina',
  picture: '/classroom/student-f-5.png',
  gender: 'female',
  skill: 4,
  behavior: 'honest and steady'
}, {
  role: 'student',
  name: 'Sophie',
  picture: '/classroom/student-f-6.png',
  gender: 'female',
  skill: 2,
  behavior: 'sensitive and creative'
}, {
  role: 'student',
  name: 'Ruby',
  picture: '/classroom/student-f-7.png',
  gender: 'female',
  skill: 3,
  behavior: 'curious and ambitious'
}, {
  role: 'student',
  name: 'Lucy',
  picture: '/classroom/student-f-8.png',
  gender: 'female',
  skill: 4,
  behavior: 'generous and reliable'
}]

