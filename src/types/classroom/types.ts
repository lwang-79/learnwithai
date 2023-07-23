
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
        description: 'The specified next person to speak.',
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
}

export const Teachers: Character[] = [{
    role: 'teacher',
    name: 'Lepilio',
    picture: '/classroom/teacher-0.png',
    gender: 'female',
    skill: 10,
    behavior: 'nice'
  }, {
    role: 'teacher',
    name: 'Furgerson',
    picture: '/classroom/teacher-2.png',
    gender: 'male',
    skill: 10,
    behavior: 'humor'
  }, {
    role: 'teacher',
    name: 'Cheung',
    picture: '/classroom/teacher-1.png',
    gender: 'female',
    skill: 10,
    behavior: 'strict'
  }
]

export const Boys: Character[] = [{
  role: 'student',
  name: 'Tom',
  picture: '/classroom/student-m-0.png',
  gender: 'male',
  skill: 1,
  behavior: 'naughty and energetic'
}, {
  role: 'student',
  name: 'James',
  picture: '/classroom/student-m-1.png',
  gender: 'male',
  skill: 2,
  behavior: 'confident and adventurous'
}, {
  role: 'student',
  name: 'Robert',
  picture: '/classroom/student-m-2.png',
  gender: 'male',
  skill: 3,
  behavior: 'curious and kind'
}, {
  role: 'student',
  name: 'Michael',
  picture: '/classroom/student-m-3.png',
  gender: 'male',
  skill: 4,
  behavior: 'adventurous and careless'
}, {
  role: 'student',
  name: 'Steven',
  picture: '/classroom/student-m-4.png',
  gender: 'male',
  skill: 5,
  behavior: 'smart and lazy'
}, {
  role: 'student',
  name: 'David',
  picture: '/classroom/student-m-5.png',
  gender: 'male',
  skill: 4,
  behavior: 'honest and steady'
}]

export const Girls: Character[] = [{
  role: 'student',
  name: 'Mary',
  picture: '/classroom/student-f-0.png',
  gender: 'female',
  skill: 1,
  behavior: 'naughty and modest'
}, {
  role: 'student',
  name: 'Linda',
  picture: '/classroom/student-f-1.png',
  gender: 'female',
  skill: 2,
  behavior: 'confident and cheerful'
}, {
  role: 'student',
  name: 'Barbara',
  picture: '/classroom/student-f-2.png',
  gender: 'female',
  skill: 3,
  behavior: 'optimistic and kind'
}, {
  role: 'student',
  name: 'Jennifer',
  picture: '/classroom/student-f-3.png',
  gender: 'female',
  skill: 4,
  behavior: 'adventurous and careless'
}, {
  role: 'student',
  name: 'Nancy',
  picture: '/classroom/student-f-4.png',
  gender: 'female',
  skill: 5,
  behavior: 'intelligent and patient'
}, {
  role: 'student',
  name: 'Lisa',
  picture: '/classroom/student-f-5.png',
  gender: 'female',
  skill: 4,
  behavior: 'honest and steady'
}, {
  role: 'student',
  name: 'Carol',
  picture: '/classroom/student-f-6.png',
  gender: 'female',
  skill: 2,
  behavior: 'sensitive and creative'
}, {
  role: 'student',
  name: 'Helen',
  picture: '/classroom/student-f-7.png',
  gender: 'female',
  skill: 3,
  behavior: 'curious and ambitious'
}, {
  role: 'student',
  name: 'Margaret',
  picture: '/classroom/student-f-8.png',
  gender: 'female',
  skill: 4,
  behavior: 'generous and reliable'
}]

