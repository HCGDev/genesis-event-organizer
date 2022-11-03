import { stores, store, createStore, updateStore, deleteStore } from './stores'

describe('stores', () => {
  scenario('returns all stores', async (scenario) => {
    const result = await stores()

    expect(result.length).toEqual(Object.keys(scenario.store).length)
  })

  scenario('returns a single store', async (scenario) => {
    const result = await store({ id: scenario.store.one.id })

    expect(result).toEqual(scenario.store.one)
  })

  scenario('creates a store', async (scenario) => {
    const result = await createStore({
      input: {
        name: 'String',
        ownerId: 'scenario.store.two.ownerId',
        email: 'String',
        phone: 'String',
        street1: 'String',
        city: 'String',
        country: 'String',
        state: 'String',
        zip: 'String',
        distributor: 'String',
      },
    })

    expect(result.name).toEqual('String')
    expect(result.ownerId).toEqual('scenario.store.two.ownerId')
    expect(result.email).toEqual('String')
    expect(result.phone).toEqual('String')
    expect(result.street1).toEqual('String')
    expect(result.city).toEqual('String')
    expect(result.country).toEqual('String')
    expect(result.state).toEqual('String')
    expect(result.zip).toEqual('String')
    expect(result.distributor).toEqual('String')
  })

  scenario('updates a store', async (scenario) => {
    const original = await store({ id: scenario.store.one.id })
    const result = await updateStore({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a store', async (scenario) => {
    const original = await deleteStore({ id: scenario.store.one.id })
    const result = await store({ id: original.id })

    expect(result).toEqual(null)
  })
})
