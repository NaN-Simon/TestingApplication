import Button from '../components/UI/button/Button'

const NotFound = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
    <span>Test doesn’t exist</span>
    <Button link='/'>Home</Button>
  </div>
  )
}

export default NotFound