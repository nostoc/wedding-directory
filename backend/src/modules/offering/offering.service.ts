import { Injectable } from '@nestjs/common';
import { OfferingEntity } from 'src/database/entities/offering.entity';
import { CreateOfferingInput } from 'src/graphql/inputs/createOffering.input';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { VendorEntity } from 'src/database/entities/vendor.entity';
import { OfferingFilterInput } from 'src/graphql/inputs/offeringFilter.input';
import { OfferingRepository } from 'src/database/repositories/offering.repository';
import { OfferingRepositoryType } from 'src/graphql/types/offeringTypes';
import { UpdateOfferingInput } from 'src/graphql/inputs/updateOffering.input';

@Injectable()
export class OfferingService {
  private offeringRepository: OfferingRepositoryType
  constructor(
    private readonly dataSource: DataSource,

    @InjectRepository(VendorEntity)
    private readonly vendorRepository: Repository<VendorEntity>,

  ) {
    this.offeringRepository = OfferingRepository(this.dataSource);
  }

  async createOffering(
    createOfferingInput: CreateOfferingInput
  ): Promise<OfferingEntity> {
    const vendor = await this.vendorRepository.findOne(
      { where: { id: createOfferingInput.vendor_id } }
    );
    
    if (!vendor) {
      throw new Error('Vendor not found');
    }
    return this.offeringRepository.createOffering(createOfferingInput, vendor);
  }

  async updateOffering(
    id: string,
    input: UpdateOfferingInput,
    mediaUrls: string[]
  ): Promise<OfferingEntity> {
    return this.offeringRepository.updateOffering(id, input, mediaUrls);
  }

  async deleteOffering(id: string): Promise<boolean> {
    return this.offeringRepository.deleteOffering(id);
  }

  async findOfferingById(id: string): Promise<OfferingEntity> {
    return this.offeringRepository.findOfferingById(id);
  }

  async findOfferingsByFilters(filterInput: OfferingFilterInput): Promise<OfferingEntity[]> {
    const { category, city } = filterInput;
    return this.offeringRepository.findOfferingsByFilters(category, city);
  }

  async findOfferingsByVendor(vendorId: string): Promise<OfferingEntity[]> {
    return this.offeringRepository.findOfferingsByVendor(vendorId);
  }

  async updateOfferingBanner(id: string, fileUrl: string): Promise<OfferingEntity> {
    // Find the offering by ID
    const offering = await this.offeringRepository.findOne({ where: { id } });

    if (!offering) {
      throw new Error('Offering not found');
    }

    // Update the profile_pic_url field
    offering.banner = fileUrl;

    // Save the updated vendor to the database
    return await this.vendorRepository.save(offering);
  }
}
