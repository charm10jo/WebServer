import { Test, TestingModule } from '@nestjs/testing';
import { SearchService } from './search.service';

describe('SearchService', () => {
  let service: SearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SearchService],
    }).compile();

    service = module.get<SearchService>(SearchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("getHospital", ()=>{
    it("should reurn an array", () => {
      const latitude = 37.507660873703294
      const longitude = 127.01586809511895
      const result = service.getEmergency(latitude, longitude)
      expect(result).toBeInstanceOf(Array)
    })
  })

});


