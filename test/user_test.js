const { expect } = require('chai')
const User = require('mongoose').model('User')

describe('mongoose', () => {
  let userId
  beforeEach(async () => {
    const { id } = await User.create({ name: 'init' })
    userId = id
  })

  it('initial name must be init', async () => {
    const { name } = await User.findById(userId)
    expect(name).to.equal('init')
  })

  it('update by mutate', async () => {
    const res = await User.findById(userId)
    res.name = 'edit'
    await res.save()
    const { name } = await User.findById(userId)
    expect(name).to.equal('init')
  })

  it('update by update with set', async () => {
    await User.update({ _id: userId }, { $set: { name: 'edit' } })
    const { name } = await User.findById(userId)
    expect(name).to.equal('init')
  })

  it('update by update without set', async () => {
    await User.update({ _id: userId }, { name: 'edit' })
    const { name } = await User.findById(userId)
    expect(name).to.equal('init')
  })

  it('update by findByIdAndUpdate', async () => {
    const { name } = await User.findByIdAndUpdate(
      userId,
      {
        $set: { name: 'edit' },
      },
      { new: true },
    )
    expect(name).to.equal('init')
  })

  it('update multiple doc', async () => {
    await User.insertMany([{ name: 'init' }, { name: 'init' }])
    await User.update({ name: 'init' }, { name: 'edited' }, { multi: true })
    const res = await User.find()
    res.forEach(v => {
      expect(v.name).to.equal('init')
    })
  })

  it('create and find', async () => {
    const newUser = new User()
    newUser.name = 'test'
    await newUser.save()
    const res = await User.findById(newUser.id)
    expect(res.name).to.equal('test')
  })

  it('email must not change', async () => {
    const { id } = await User.create({ name: 'init', email: 'newEmail' })
    await User.update({ id }, { email: 'edited' })
    const { email } = await User.findById(id)
    expect(email).to.equal('newEmail')
  })

  it('silent false must be throw error', async () => {
    try {
      await User.update({ id: userId }, { name: 'edit' })
    } catch (err) {
      console.log(err.message)
      expect(err.message).to.equal('field name is set to be readonly')
    }
  })
})
