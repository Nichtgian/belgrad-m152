runTests();

function runTests() {
  setupTestCalculateNewImageIndex();
}

function setupTestCalculateNewImageIndex() {
  let testConfigurations = [{
    testSlides: [
      { src: "https://via.placeholder.com/200x100.png?text=Image 1", alt: "image 1 alt" },
      { src: "https://via.placeholder.com/800x300.png?text=Image 2", alt: "image 2 alt" },
      { src: "https://via.placeholder.com/300x500.png?text=Image 3", alt: "image 3 alt" }
    ],
    testCases: [
      { setup: { direction: 1, currentIndex: 0 }, expectedResult: 1 },
      { setup: { direction: 1, currentIndex: 1 }, expectedResult: 2 },
      { setup: { direction: 1, currentIndex: 2 }, expectedResult: 0 }
    ]}, {
    testSlides: [
      { src: "https://via.placeholder.com/200x100.png?text=Image 1", alt: "image 1 alt" },
      { src: "https://via.placeholder.com/800x300.png?text=Image 2", alt: "image 2 alt" },
      { src: "https://via.placeholder.com/300x500.png?text=Image 3", alt: "image 3 alt" },
      { src: "https://via.placeholder.com/300x500.png?text=Image 4", alt: "image 4 alt" }
    ],
    testCases: [
      { setup: { direction: -1, currentIndex: 3 }, expectedResult: 2 },
      { setup: { direction: -1, currentIndex: 2 }, expectedResult: 1 },
      { setup: { direction: -1, currentIndex: 1 }, expectedResult: 0 },
      { setup: { direction: -1, currentIndex: 0 }, expectedResult: 3 }
    ]}
  ];

  testConfigurations.forEach((testConfiguration) => {
    testConfiguration.testCases.forEach((testCase) => {
      let testResult = testCalculateNewImageIndex(testConfiguration.testSlides, testCase);

      if (!testResult.passed) {
        console.error("Test failed! expected(" + testResult.testCase.expectedResult + ") but got(" + testResult.value + ")");
      } else {
        console.log("Test passed! got(" + testResult.value + ")")
      }
    });
  });
}

function testCalculateNewImageIndex(testSlides, testCase) {
  let testResult = {
    passed: true,
    message: "",
    value: null,
    testCase: testCase
  }

  let calculatedIndex = calculateNewImageIndex(testCase.setup.direction, testCase.setup.currentIndex, testSlides);
  testResult.value = calculatedIndex;

  if (calculatedIndex != testCase.expectedResult) {
    testResult.passed = false;
  }

  return testResult;
}
