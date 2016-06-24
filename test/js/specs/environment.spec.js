describe('what3words', function () {
    it('should find secure environment variables', function() {
        expect(W3W_API_KEY).toBeDefined();
    });
    it('should find non-empty secure environment variables', function() {
        expect(W3W_API_KEY).not.toBe('');
    });
});
