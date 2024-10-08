import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { VisitorService } from 'src/modules/visitor/visitor.service';
import { VisitorModel } from '../models/visitor.model';
import { CreateVisitorInput } from '../inputs/create-visitor.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/modules/auth/guards/gql-auth.guard';
import { CurrentUser } from 'src/modules/auth/current-user.decorator';
import { VisitorEntity } from 'src/database/entities/visitor.entity';

@Resolver(() => VisitorModel)
export class VisitorResolver {
  constructor(private readonly visitorService: VisitorService) {}

  @Mutation(() => VisitorModel)
  async createVisitor(@Args('createVisitorInput') createVisitorInput: CreateVisitorInput): Promise<VisitorModel> {
    return this.visitorService.create(createVisitorInput);
  }

  @Query(() => [VisitorModel])
  async findAllVisitors(): Promise<VisitorModel[]> {
    return this.visitorService.findAll();
  }

  @Query(() => VisitorModel, { nullable: true })

  async findVisitorById(@Args('id') id: string): Promise<VisitorModel> {
    return this.visitorService.findOne(id);
  }

  @Mutation(() => Boolean)
  async removeVisitor(@Args('id') id: string): Promise<boolean> {
    await this.visitorService.remove(id);
    return true;
  }
}
