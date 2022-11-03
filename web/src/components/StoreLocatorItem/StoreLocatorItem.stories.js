import { GeneralStoreMocks } from 'src/mocks/StoreMocks'
import StoreLocatorItem from './StoreLocatorItem'

export const generated = () => {
  return <StoreLocatorItem store={GeneralStoreMocks.store1} />
}

export default { title: 'Components/StoreLocatorItem' }
