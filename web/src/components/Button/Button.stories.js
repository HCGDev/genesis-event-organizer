import Button from './Button'

const Template = (args) => <Button {...args} />

export const button = Template.bind({})
export const submit = Template.bind({})

button.args = {
  children: 'Hello There',
}

submit.args = {
  ...button.args,
  as: 'submit',
}

export default {
  title: 'Components/Button',
  argTypes: {
    color: {
      options: ['green', 'indigo', 'red'],
      control: { type: 'select' },
    },
  },
}
