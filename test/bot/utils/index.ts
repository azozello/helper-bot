import {assert} from "chai"
import {getUrlParameter} from "../../../src/bot/utils"


describe('getUrlParameter', () => {
  it('should return url parameter value if present', () => {
    assert.equal(getUrlParameter('test/url?code=228', 'code'), '228')
  })
  it('should return default value in parameter is not present', () => {
    assert.equal(getUrlParameter('test/url', 'code', '228'), '228')
  })
})
