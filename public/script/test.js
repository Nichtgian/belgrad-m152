test();

function testCalculateNewImageIndex(testCase) {
  let testResult = {
    passed: true,
    message: "",
    value: null,
    testCase: testCase
  }

  let calculatedIndex = calculateNewImageIndex(testCase.direction, testCase.currentIndex, testCase.slides);
  testResult.value = calculatedIndex;

  if (calculatedIndex != testCase.expectedResult) {
    testResult.passed = false;
  }

  return testResult;
}

function test() {
  let testSlides = [
    { src: "https://via.placeholder.com/200x100.png?text=Image 1", alt: "image 1 alt" },
    { src: "https://via.placeholder.com/800x300.png?text=Image 2", alt: "image 2 alt" },
    { src: "https://via.placeholder.com/300x500.png?text=Image 3", alt: "image 3 alt" }
  ];

  let testCases = [
    { direction: 1, slides: testSlides, currentIndex: 0, expectedResult: 1 },
    { direction: 1, slides: testSlides, currentIndex: 1, expectedResult: 2 },
    { direction: 1, slides: testSlides, currentIndex: 2, expectedResult: 0 },
    { direction: -1, slides: testSlides, currentIndex: 2, expectedResult: 1 },
    { direction: -1, slides: testSlides, currentIndex: 1, expectedResult: 0 },
    { direction: -1, slides: testSlides, currentIndex: 0, expectedResult: 2 },
  ];

  for (let i = 0; i < testCases.length; i++) {
    testResult = testCalculateNewImageIndex(testCases[i]);

    if (!testResult.passed) {
      console.error("Test failed! expected(" + testResult.testCase.expectedResult + ") but got(" + testResult.value + ")");
    } else {
      console.log("Test passed! got(" + testResult.value + ")")
    }
  }
}
