import { QuestionMarkCircleIcon } from '@heroicons/react/solid'
import ReactTooltip from 'react-tooltip'

const ToolTip = ({
  text = 'ToolTipText',
  place = 'top',
  iconClass = 'h-5 w-5 inline-block',
}) => {
  return (
    <>
      <QuestionMarkCircleIcon data-tip={text} className={iconClass} />

      <ReactTooltip place={place} type="dark" effect="solid" multiline />
    </>
  )
}

export default ToolTip
