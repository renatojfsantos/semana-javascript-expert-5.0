import {
  describe,
  test,
  expect,
  jest
} from '@jest/globals'
import fs from 'fs'
import FileHelper from '../../src/fileHelper.js'

import Routes from '../../src/routes.js'

describe('#FileHelper', () => {

  describe('#getFileStatus', () => {
    test('it should return files statuses in correct format', async () => {
      const statMock = {
        dev: 16777221,
        mode: 33188,
        nlink: 1,
        uid: 501,
        gid: 20,
        rdev: 0,
        blksize: 4096,
        ino: 10830343,
        size: 604287,
        blocks: 1184,
        atimeMs: 1630984723291.0964,
        mtimeMs: 1630984721704.6426,
        ctimeMs: 1630984721704.9827,
        birthtimeMs: 1630984721703.376,
        atime: '2021-09-07T03:18:43.291Z',
        mtime: '2021-09-07T03:18:41.705Z',
        ctime: '2021-09-07T03:18:41.705Z',
        birthtime: '2021-09-07T03:18:41.703Z'
      }

      const mockUser = 'sas'
      process.env.USER = mockUser
      const filename = 'file.png'

      jest.spyOn(fs.promises, fs.promises.readdir.name)
        .mockResolvedValue([filename])

      jest.spyOn(fs.promises, fs.promises.stat.name)
        .mockResolvedValue(statMock)
      
      const result = await FileHelper.getFilesStatus("/tmp")

      const expectedResult = [
        {
          size: "604 kB",
          lastModified: statMock.birthtime,
          owner: mockUser,
          file: filename
        }
      ]

      expect(fs.promises.stat).toHaveBeenCalledWith(`/tmp/${filename}`)
      expect(result).toMatchObject(expectedResult)
    })
  })
})