export const compareArrays = (right, answer) => {
  // Check if all elements of answer are in right
  return answer.every(item => right.includes(item)) &&
    // Check if answer has no extra elements not in right
    answer.length === right.length;
}