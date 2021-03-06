/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { Interface } from '../interface/interface.entity';
import { Module } from '../module/module.entity';
import { Repository } from '../repository/repository.entity';
import { User } from '../user/user.entity';

export enum SCOPES {
  REQUEST = 'request',
  RESPONSE = 'response',
}

export enum TYPES {
  STRING = 'String',
  NUMBER = 'Number',
  BOOLEAN = 'Boolean',
  OBJECT = 'Object',
  ARRAY = 'Array',
  FUNCTION = 'Function',
  REGEXP = 'RegExp',
}
@Entity()
@Tree('closure-table')
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: SCOPES,
    nullable: false,
    default: SCOPES.RESPONSE,
    comment: 'property owner',
  })
  scope: string;

  @Column({
    type: 'enum',
    enum: TYPES,
    nullable: false,
    comment: 'property type',
  })
  type: string;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 128,
    comment: 'property generation rules',
  })
  rule: string;

  @Column({
    type: 'text',
    comment: 'value of this property',
  })
  value: string;

  @Column({
    type: 'text',
  })
  description: string;

  @ManyToOne(() => User)
  creator: User;

  @ManyToOne(() => Interface, _interface => _interface.properties)
  interface: Interface;

  @ManyToOne(() => Module)
  module: Module;

  @ManyToOne(() => Repository)
  repository: Repository;

  @TreeChildren()
  children: Property[];

  @TreeParent()
  parent: Property;
}
