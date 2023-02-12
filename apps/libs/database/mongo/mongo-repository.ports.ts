export interface Save<Entity> {
  save(entity: Entity): Promise<string | undefined>;
}

export interface FindOne<Entity> {
  findOne(id: number | string, key: string, populate?: string): Promise<Entity | undefined>;
  findByQuery(populate: string, seleted: string, startDate?: string, endDate?: string): Promise<Entity[]>;
}

export interface Get<Entity> {
  get(): Promise<Entity[]>;
}

export interface DeleteOne<Entity> {
  delete(entity: Entity): Promise<void>;
}

export interface UpdateOne<Entity> {
  updateOne(entity: Entity): Promise<void>;
}

export interface MongoRepositoryPort<Entity>
  extends Save<Entity>,
    FindOne<Entity>,
    DeleteOne<Entity>,
    UpdateOne<Entity>,
    Get<Entity> {}
