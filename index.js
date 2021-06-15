const params = ["kita", "atik", "tika", "aku", "kia", "makan", "kua"];

const findAnagram = (strings) => {
  /** Step 1: Grouping */
  const result = [];
  for (let groupingIndex = 0; groupingIndex < strings.length; groupingIndex++) {
    const string = strings[groupingIndex];
    const stringLength = string.length;

    /** skip if string is empty */
    if (stringLength <= 0) continue;

    let selectedGroup;

    /** find group for current string */
    for (let forGroupIndex = 0; forGroupIndex < result.length; forGroupIndex++) {
      const group = result[forGroupIndex];
      const groupFirstContent = group[0];

      /** skip if length is not same */
      if (stringLength !== groupFirstContent.length) continue;

      /** check is anagram */
      let applicable = true;
      for (let letterIndex = 0; letterIndex < stringLength; letterIndex++) {
        const letter = string[letterIndex];
        /** if a letter doesn't exist in the current group, then not anagram */
        if (groupFirstContent.indexOf(letter) < 0) applicable = false;
      }

      /** if applicable then set selecedGroup */
      if (applicable) selectedGroup = group;
    }

    /** push to result */
    if (selectedGroup) {
      selectedGroup.push(string);
    } else {
      result.push([string]);
    }
  }

  /** Step 2: Sorting */
  const resultSorted = [];
  for (let sortingIndex = 0; sortingIndex < result.length; sortingIndex++) {
    const group = result[sortingIndex];
    let inserted = false;

    /** insert to previous condition */
    for (let sortedIndex = 0; sortedIndex < resultSorted.length; sortedIndex++) {
      /** if group length is bigger, insert previous */
      if (group.length > resultSorted[sortedIndex].length) {
        /** insert at selected index */
        resultSorted.splice(sortedIndex, 0, group);
        inserted = true;

        /** break from loop */
        break;
      }

      /** if group length is same, compare by anagram word length */
      if (group.length === resultSorted[sortedIndex].length) {
        const groupFirstContent = group[0];
        const resultSortedFirstContent = resultSorted[sortedIndex][0];

        /** if anagram word length is bigger, insert previous */
        if (groupFirstContent.length > resultSortedFirstContent.length) {
          /** insert at selected index */
          resultSorted.splice(sortedIndex, 0, group);
          inserted = true;

          /** break from loop */
          break;
        }
      }
    }

    /** if none of above condition occur, insert to latest index */
    if (!inserted) resultSorted.push(group);
  }

  return resultSorted;
};

const findAnagrams = (params) => {
  if (params.length < 0) return "Params Empty";
  // if Params Two Dimensional
  if (Array.isArray(params[0])) {
    const anagrams = [];
    for (let i = 0; i < params.length; i++) {
      const strings = params[i];
      anagrams.push(findAnagram(strings));
    }
    return anagrams;
  } else {
    return findAnagram(params);
  }
};

const anagrams = findAnagrams(params);
console.log(anagrams);
