// geolocation.test.js
import { expect } from 'chai';
import { updateLocation, locationError } from './geolocation';

describe('Geolocation', () => {
  describe('updateLocation()', () => {
    it('should return the correct location string given a position object', () => {
      const mockPosition = {
        coords: {
          latitude: 40.7128,
          longitude: 74.0060,
        },
      };

      const result = updateLocation(mockPosition);
      expect(result).to.equal('Latitude: 40.7128, Longitude: 74.006');
    });
  });

  describe('locationError()', () => {
    const mockError = code => ({ code });

    it('should handle PERMISSION_DENIED error', () => {
      const error = locationError(mockError(1));
      expect(error).to.equal('User denied the request for Geolocation.');
    });

    it('should handle POSITION_UNAVAILABLE error', () => {
      const error = locationError(mockError(2));
      expect(error).to.equal('Location information is unavailable.');
    });

    it('should handle TIMEOUT error', () => {
      const error = locationError(mockError(3));
      expect(error).to.equal('The request to get user location timed out.');
    });

    it('should handle UNKNOWN_ERROR error', () => {
      const error = locationError(mockError(0));
      expect(error).to.equal('An unknown error occurred.');
    });
  });
});
