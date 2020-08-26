import path from 'path';

export default (fixturesPath, file1Name, file2Name) => {
  const firstFilePath = path.join(fixturesPath, file1Name);
  const secondFilePath = path.join(fixturesPath, file2Name);
  const firstFileFormat = path.extname(firstFilePath);
  const secondFileFormat = path.extname(secondFilePath);

  return [firstFilePath, secondFilePath, firstFileFormat, secondFileFormat];
};
