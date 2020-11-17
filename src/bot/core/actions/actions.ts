const Actions = {
  REGISTER_USER: 'REGISTER_USER',

  SUBJECTS: {
    SHOW_ROOT: 'subjects',

    OOP: {
      SHOW_ROOT: 'subjects.oop',

      TRAINING: {
        SHOW_ROOT: 'subjects.oop.training'
      },
      PROJECT_ELLEN: {
        SHOW_ROOT: 'subjects.oop.projectEllen'
      }
    },

    ZAP: {
      SHOW_ROOT: 'subjects.zap',

      KAREL: {
        SHOW_ROOT: 'subjects.zap.karelTheRobot',
        BUY: {
          SHOW_ROOT: 'subjects.zap.karelTheRobot.buy',
        }
      },
      NUMBERS: {
        SHOW_ROOT: 'subjects.zap.numberArrays'
      },
      HANGMAN: {
        SHOW_ROOT: 'subjects.zap.hangman'
      },
      QR_CODE: {
        SHOW_ROOT: 'subjects.zap.qrCode'
      },
      FILES: {
        SHOW_ROOT: 'subjects.zap.files'
      },
      CURSES: {
        SHOW_ROOT: 'subjects.zap.curses'
      }
    },

    DATABASE: {
      SHOW_ROOT: 'subjects.database',

      KPI: {
        SHOW_ROOT: 'subjects.database.kpi'
      },
      KKUI: {
        SHOW_ROOT: 'subjects.database.kkui'
      }
    },

    PROGRAMMING: {
      SHOW_ROOT: 'subjects.programming',

      TOP_SECRET: {
        SHOW_ROOT: 'subjects.programming.topSecret'
      },
      K: {
        SHOW_ROOT: 'subjects.programming.k'
      },
      SOME_PROBLEMS: {
        SHOW_ROOT: 'subjects.programming.someProblems'
      },
      BMP_TRANSFORM: {
        SHOW_ROOT: 'subjects.programming.bmpTransform'
      },
      ADVENTURE: {
        SHOW_ROOT: 'subjects.programming.adventure'
      },
      MASTER_MIND: {
        SHOW_ROOT: 'subjects.programming.masterMind'
      },
      MUSIC_PLAYER: {
        SHOW_ROOT: 'subjects.programming.musicPlayer'
      }
    }
  }
}


export {Actions}
