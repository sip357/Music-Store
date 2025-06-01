import { GET } from '@/app/api/getInstrumentals/route';
import { NextRequest } from 'next/server';
import { mockClient } from 'aws-sdk-client-mock';
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

jest.mock('@aws-sdk/s3-request-presigner', () => ({
  getSignedUrl: jest.fn(),
}));

// Mock DynamoDB and S3Client
const dynamoMock = mockClient(DynamoDB);
const s3Mock = mockClient(S3Client);

describe('GET /api/beats', () => {
  beforeEach(() => {
    dynamoMock.reset();
    s3Mock.reset();
    (getSignedUrl as jest.Mock).mockReset();
  });

  it('should return beats with pre-signed URLs', async () => {
    // Mock DynamoDB response
    dynamoMock.onAnyCommand().resolves({
      Items: [
        { Id: { S: 'beat1' } },
        { Id: { S: 'beat2' } },
      ],
    });

    // Mock getSignedUrl for each beat
    (getSignedUrl as jest.Mock).mockImplementation(async (_, __, ___) => {
      return 'https://example.com/presigned-url';
    });

    // Mock NextRequest
    const url = new URL('http://localhost/api/beats');
    const req = {
      nextUrl: url,
    } as unknown as NextRequest;

    const res = await GET(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.beatsWithUrls.length).toBe(2);
    expect(json.beatsWithUrls[0].src).toBe('https://example.com/presigned-url');
  });

  it('should handle errors gracefully', async () => {
    dynamoMock.onAnyCommand().rejects(new Error('DynamoDB failed'));

    const url = new URL('http://localhost/api/beats');
    const req = {
      nextUrl: url,
    } as unknown as NextRequest;

    const res = await GET(req);
    const json = await res.json();

    expect(res.status).toBe(500);
    expect(json.error).toBe('Failed to retrieve beats');
  });
});
