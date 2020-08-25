import path from 'path';

export default (fixturesPath, file1Name, file2Name, resultFileName) => {
  const firstFilePath = path.join(fixturesPath, file1Name);
  const secondFilePath = path.join(fixturesPath, file2Name);
  const expectedFilePath = path.join(fixturesPath, resultFileName);
  const firstFileFormat = path.extname(firstFilePath);
  const secondFileFormat = path.extname(secondFilePath);

  return [firstFilePath, secondFilePath, expectedFilePath, firstFileFormat, secondFileFormat];
};
