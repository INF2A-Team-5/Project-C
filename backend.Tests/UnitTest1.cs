using Xunit;
using backend.Services;
﻿using FakeItEasy;


namespace backend.Tests
{
    public class SetuptestsTest
    {
        private Setuptests _setuptests;
        public SetuptestsTest()
        {
            _setuptests = new Setuptests(0);
        }
        [Fact]
        public void Setuptests_gkhjfsd_ReturnsString()
        {
            // Arrange
            bool input = true;
            var expected = "true";
            // Act
            var result = _setuptests.gkhjfsd(input);
            // Assert
            Assert.Equal(result, expected);
        }
    }
    public class SetuptestssTest
    {
        [Theory]
        [InlineData(-1)]
        [InlineData(0)]
        [InlineData(1)]
        public void IsPrime_ValuesLessThan2_ReturnFalse(int value)
        {
            //Arrange
            var setuptestss = new Setuptestss();
            var expected = "true";
            //Act
            var result = setuptestss.gkhjfsdd(value);
            //Assert
            Assert.Equal(result, expected);
        }
    }
}
