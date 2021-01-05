import {assert} from 'chai'
import {getTranslator} from "../../../src/bot/translator"
import {Languages} from "../../../src/bot/translator/languages"


describe('translated', () => {
  const translated = getTranslator(Languages.ENG)

  it('should return valid string for valid key', () => {
    assert.equal(translated('subjects.select'), 'Select subject')
  })
  it('should return key if could not find value', () => {
    assert.equal(translated('a.b.c.d.e.f.g'), 'a.b.c.d.e.f.g')
  })
})
