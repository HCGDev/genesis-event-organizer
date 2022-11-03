import {
  banners,
  banner,
  createBanner,
  updateBanner,
  deleteBanner,
} from './banners'

describe('banners', () => {
  scenario('returns all banners', async (scenario) => {
    const result = await banners()

    expect(result.length).toEqual(Object.keys(scenario.banner).length)
  })

  scenario('returns a single banner', async (scenario) => {
    const result = await banner({ id: scenario.banner.one.id })

    expect(result).toEqual(scenario.banner.one)
  })

  scenario('creates a banner', async (scenario) => {
    const result = await createBanner({
      input: { backgroundUrl: 'String' },
    })

    expect(result.backgroundUrl).toEqual('String')
  })

  scenario('updates a banner', async (scenario) => {
    const original = await banner({ id: scenario.banner.one.id })
    const result = await updateBanner({
      id: original.id,
      input: { backgroundUrl: 'String2' },
    })

    expect(result.backgroundUrl).toEqual('String2')
  })

  scenario('deletes a banner', async (scenario) => {
    const original = await deleteBanner({ id: scenario.banner.one.id })
    const result = await banner({ id: original.id })

    expect(result).toEqual(null)
  })
})
