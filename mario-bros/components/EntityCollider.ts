export default class EntityCollider {
  entities: any;

  constructor(entities: any) {
    this.entities = entities;
  }

  check(subject: any) {
    this.entities.forEach(() => {
      this.entities.forEach((candidate: any) => {
        if (subject === candidate) {
          return;
        }

        if (subject.bounds.overlaps(candidate.bounds)) {
          subject.collides(candidate);
          candidate.collides(subject);
        }
      });
    });
  }
}
